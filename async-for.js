(function () {

    console.log('async-for started!');
    /** 
     * inputArray
     * onEachAction: (item, index, onEachResolve())
     * onEachResolve: (item, index, data, isDone)
     * onError
     */
    function seqProcess(inputArray, onEachAction, onEachResolve) {//, onAll, initialValue, onEachSuccess, onError) {
        var arr = inputArray || [];

        // var accumulator = initialValue;
        // if(arr.length === 0) {
        //     onAll(accumulator);
        //     return;
        // }

        processOne(inputArray, 0, onEachAction, onEachResolve);
    }

    function processOne(inputArray, index, onEachAction, onEachResolve) {
        if(index >= 0 && index < inputArray.length) {
            //console.log(`exec nb: ${index}`);
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