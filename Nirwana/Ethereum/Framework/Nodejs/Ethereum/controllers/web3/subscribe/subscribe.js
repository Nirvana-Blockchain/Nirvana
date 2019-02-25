var EventManager = require("../../../eventmaganer/EventManager");
/**
 *
 */
const subscribedEvents = {};

exports.subscribeLogs = function(req, res) {
  var contract = req.body.contract;
  var eventName = req.body.eventName;

  const eventJsonInterface = web3.utils._.find(
    contract._jsonInterface,
    o => o.name === eventName && o.type === "event"
  );

  const subscription = web3.eth
    .subscribe(
      "logs",
      {
        address: contract.options.address,
        topics: [eventJsonInterface.signature]
      },
      (error, result) => {
        if (!error) {
          const eventObj = web3.eth.abi.decodeLog(
            eventJsonInterface.inputs,
            result.data,
            result.topics.slice(1)
          );
          // Emit this events
          console.log(`New ${eventName}!`, eventObj);
        }
      }
    )
    .on("data", log => {
      console.log(log);
      EventManager.emitEvent("subscribe:subscribeLogs:data:logs", log);
    })
    .on("changed", log => {
      EventManager.emitEvent("subscribe:subscribeLogs:changed:logs", log);
    });
  subscribedEvents[eventName] = subscription;
};

exports.subscribePendingTransaction = function(req, res) {
  const subscription = web3.eth
    .subscribe("pendingTransactions", function(error, result) {
      if (!error) console.log(result);
    })
    .on("data", function(transaction) {
      EventManager.emitEvent(
        "subscribe:subscribePendingTransaction:data:pendingTransactions",
        transaction
      );
    })
    .on("changed", log => {
      EventManager.emitEvent(
        "subscribe:subscribePendingTransaction:changed:pendingTransactions",
        transaction
      );
    });
  subscribedEvents[eventName] = subscription;
};

exports.subscribeNewBlockHeaders = function(req, res) {
  const subscription = web3.eth
    .subscribe("newBlockHeaders", function(error, result) {
      if (!error) console.log(result);
    })
    .on("data", function(transaction) {
      EventManager.emitEvent(
        "subscribe:subscribeNewBlockHeaders:data:newBlockHeaders",
        transaction
      );
    })
    .on("changed", transaction => {
      EventManager.emitEvent(
        "subscribe:subscribeNewBlockHeaders:changed:newBlockHeaders",
        transaction
      );
    });
  subscribedEvents[eventName] = subscription;
};

exports.subscribeSyncing = function(req, res) {
  const subscription = web3.eth
    .subscribe("syncing", function(error, result) {
      if (!error) console.log(result);
    })
    .on("data", function(transaction) {
      EventManager.emitEvent(
        "subscribe:subscribeSyncing:data:syncing",
        transaction
      );
    })
    .on("changed", log => {
      EventManager.emitEvent(
        "subscribe:subscribeSyncing:changed:syncing",
        transaction
      );
    });
  subscribedEvents[eventName] = subscription;
};

exports.unsubscribe = function(req, res) {
  var subscription = subscribedEvents[req.eventName];
  // unsubscribes the subscription
  subscription.unsubscribe(function(error, success) {
    if (success) {
      res.json({
        message: "Successfully unsubscribed!",
        success: true
      });
    } else {
      res.json({
        error: error,
        message: "Error in unsubscribing",
        success: true
      });
    }
  });
};
