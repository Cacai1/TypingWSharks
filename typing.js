// allows a word to be typed on
function wordType(wordObj, inOrder) {
  //wordObj.lettersTyped[0] = true;
  if (inOrder) {
    if (wordObj.lettersTyped[0] == true) {
      for (i in wordObj.word) {
        if (i > 0) {
          if (
            wordObj.lettersTyped[i - 1] == true &&
            wordObj.lettersTyped[i] == false
          ) {
            if (key.toUpperCase() == wordObj.word[i]) {
              wordObj.lettersTyped[i] = true;
              key = "SHIFT";
            }
          }
        }
      }
    } else {
      if (key.toUpperCase() == wordObj.word[0]) {
        wordObj.lettersTyped[0] = true;
      }
    }
  } else {
    for (i in wordObj.word) {
      if (key.toUpperCase() == wordObj.word[i]) {
        wordObj.lettersTyped[i] = true;
      }
    }
  }
}
