///https://www.codexpedia.com/node-js/node-js-batch-process-records-in-parallel-from-mysql-table/

var async = require("async");

//Third function triggered by batch()
//update the record of the provided id
function process(id) {
  var updateQuery = mysql.format(
    "update test set is_processed=1, evenNum=id*2 where id=?",
    [id]
  );
  return function(cb) {
    dbpool.query(updateQuery, function(err, result) {
      if (err) {
        console.log("Error3: ", err);
        cb(err);
      } else {
        cb();
      }
    });
  };
}

//Seond function triggered by the init function run(), get batchSize records and then parallelLimit processes in parallel by calling the function process()
//{number} batchSize, the number of records need to be processed
//{number} parallelLimit, the max number of processes run in parallel
function batch(batchSize, parallelLimit) {
  var selectQuery = mysql.format(
    "select * from test where is_processed=0 limit ?",
    [batchSize]
  );
  var statusQuery = "select count(*) as count from test where is_processed=1";
  return function(cb) {
    var toDo = [];
    dbpool.query(selectQuery, function(err, result) {
      if (err) {
        console.log("Error1: ", err);
        cb(err);
      } else {
        //pushing each process onto the toDo list
        for (var i = 0; i < result.length; i++) {
          toDo.push(process(result[i].id));
        }

        //run each process from the toDo list in series
        async.parallelLimit(toDo, parallelLimit, function(err, result) {
          if (err) {
            console.log("Error2", err);
            cb(err);
          } else {
            //Get the number of processed records
            dbpool.query(statusQuery, function(err, total) {
              //console.log(total[0].count + " rows processed!");
              cb();
            });
          }
        });
      }
    });
  };
}

//Init function, divide the total number of records into N batches of each batch containing batchSize records
//put each batch in an array of toDo list, and each one is processed in series in the async.series
//{number} batchSize, required param, the max number of records can have in a batch
//{number} parallelLimit, the max number of processes run in parallel
//{number} total, optional param, the total number of record need to be processed, if is not defined, it will process all the unprocessed records in the table
function run(batchSize, parallelLimit, total) {
  function startBatches(total) {
    var toDo = [];
    console.log(total, " rows to process.");
    for (var i = 0; i < total; i += batchSize) {
      //pushing each batch onto the toDo list
      toDo.push(batch(batchSize, parallelLimit));
    }

    //run each batch from the toDo list in series
    async.series(toDo, function(err, results) {
      if (err) console.log("Done! Error: ", err);
      //console.log("Done!");
      dbpool.end();
      console.log(new Date());
    });
  }

  // db.Ranking.findAll().then(function(result){
  //             startBatches(result.length)
  //     }, function(error){
  //             console.log(err)
  // });
}

console.log(new Date());
run(1000, 100);
