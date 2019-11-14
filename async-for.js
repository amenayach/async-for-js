(function () {

    console.log('async-for started!');
    /** 
     * inputArray
     * onEachAction: (item, index, onEachResolve())
     * onEachResolve: (item, index, data, isDone)
     */
    function seqProcess(inputArray, onEachAction, onEachResolve) {
        var arr = inputArray || [];

        processOne(arr, 0, onEachAction, onEachResolve);
    }

    function processOne(inputArray, index, onEachAction, onEachResolve) {
        if(index >= 0 && index < inputArray.length) {
            onEachAction(inputArray[index], index, function (item, nextIndex, data) {
                onEachResolve(item, nextIndex, data, nextIndex === inputArray.length - 1);
                if(index < inputArray.length - 1) {
                    processOne(inputArray, index + 1, onEachAction, onEachResolve);
                }
            });
        }
    }

    window.asyncFor = {
        seqProcess: seqProcess 
    }
})();