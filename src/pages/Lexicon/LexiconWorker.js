function renderList(operationID) {}

self.addEventListener(`message`, ({ data: { data, operation, operationID } }) => {
  self[operation](operationID, data);
});
