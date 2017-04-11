export const insertionSort = (arr) => {
  for (let i = 1; i < arr.length; i++) {
      var tmp = arr[i],
      j = i;
      while (j > 0 && arr[j-1].mValue >= tmp.mValue) {
          arr[j] = arr[j-1];
          --j;
      }
      arr[j] = tmp;
  }
  return arr;
}

export const spacedAlgo = (array, userAnswer) => {
  console.log('INSIDE ALGO')
  if (userAnswer === array[0].answer) {
    ++array[0].mValue;
  }  
  else {
    array[0].mValue = 1;
  }
  insertionSort(array);
  return array;
};