export const START_LOADING = 'START_LOADING'
export const END_LOADING = 'END_LOADING'
export const ENDALL_LOADING = 'ENDALL_LOADING'
import {
    pendingTask, // The action key for modifying loading state
    begin, // The action value if a "long" running task begun
    end, // The action value if a "long" running task ended
    endAll // The action value if all running tasks must end
  } from 'react-redux-spinner';


// This gets called for transforming action response into reducer format
export const startLoading = data => (
    {
        type: START_LOADING,
        [ pendingTask ]: begin
    }
)


export const endLoading = data => (
    {
        type: END_LOADING,
        [ pendingTask ]: end
    }
)

export const endAllLoading = data => (
    {
        type: ENDALL_LOADING,
        [ pendingTask ]: endAll
    }
)
