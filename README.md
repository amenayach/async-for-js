# async-for-js
A JS functionality to achieve sequential async array processing without async await which supports even IE!

```js

/* =========================== Simple scenario =========================== */
asyncFor.seqProcess(['a', 'b','c'], function (item, index, resolve) {
    setTimeout(() => {
        resolve(item, index);
    }, 400);        
}, function (item, index, data, isDone) {
    console.log(item, index, isDone);
});

/* =========================== Nested scenario =========================== */
var labels = [
    {
        label: 'L1',
        subFields: [
            {
                internalName: 'id',
                displayName: 'ID',
                type: 'input'
            },
            {
                internalName: 'code',
                displayName: 'Code',
                type: 'radio'
            }
        ]
    },
    {
        label: 'L2',
        subFields: [
            {
                internalName: 'id2',
                displayName: 'ID2',
                type: 'input'
            },
            {
                internalName: 'code2',
                displayName: 'Code2',
                type: 'radio'
            },
            {
                internalName: 'lookup2',
                displayName: 'Lookup2',
                type: 'lookup'
            }
        ]
    }
];

/* =========================== Nested console scenario =========================== */
asyncFor.seqProcess(labels, function (item, index, resolve) {
    setTimeout(() => {

        console.log(`Start processing ${item.label} subFields...`);

        asyncFor.seqProcess(item.subFields, function (itemField, indexField, resolveField) {
            setTimeout(() => {
                resolveField(itemField, indexField);
            }, 1400);
        }, function (itemField, indexField, dataField, isDoneField) {
            console.log(itemField, indexField, isDoneField);
            if(isDoneField) resolve(item, index, null, true);
        });

    }, 400);
}, function (item, index, data, isDone) {
    console.log(`Label ${item.label} - IsDone: ${isDone}`);
});

/* =========================== Nest HTML scenario with http call =========================== */
var htmlBuilder = '';
asyncFor.seqProcess(labels, function (item, index, resolve) {
    setTimeout(() => {

        console.log(`Start processing ${item.label} subFields...`);
        htmlBuilder += `<h2>${item.label}</h2>`;

        asyncFor.seqProcess(item.subFields, function (itemField, indexField, resolveField) {
            if (itemField.type === 'lookup') {
                fetch('https://jsonplaceholder.typicode.com/todos/1')
                    .then(response => response.json())
                    .then(json => {
                        console.log('http done', json);
                        resolveField(itemField, indexField, json);
                    });
            }
            else {
                resolveField(itemField, indexField);
            }
        }, function (itemField, indexField, dataField, isDoneField) {
            console.log(itemField, indexField, isDoneField);
            var httpData = dataField ? dataField.title : '';
            htmlBuilder += `<h3 style='margin-left:20px;'>${itemField.internalName} - 
                ${itemField.type} - ${httpData}</h3>`;
            if (isDoneField) resolve(item, index, null, true);
        });

    }, 400);
}, function (item, index, data, isDone) {
    console.log(`Finishing label ${item.label} - IsDone: ${isDone}`);
    if (isDone) {
        document.querySelector('.FormShape').innerHTML = htmlBuilder;
    }
});

```
