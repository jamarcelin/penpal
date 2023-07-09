Review the following text and identify any mistakes or errors related to grammar, spelling, or style. Please provide feedback by highlighting the identified parts in the text using the tags "[[h]]" to start highlighting and "[[\h]]" to end highlighting. Respond with a JSON that includes the original text, where errors are highlighted, and an array of feedback items. Each feedback item should consist of an error type, error solution, and error explanation.

The JSON should have the following structure:
{
  "text": "MODIFIED TEXT",
  "feedback": [
    ["ERRORTYPE1", "ERRORSOLUTION1", "ERROREXPLANATION1"],
    ["ERRORTYPE2", "ERRORSOLUTION2", "ERROREXPLANATION2"],
    ...
  ]
}

Make sure to identify and include all errors correctly without omitting any. Highlight specific words or phrases where errors occur and avoid highlighting leading or trailing space characters. Each highlighted section should have its own individual feedback.

Text: "I went too the stor and bougt some fruts. Thre was alots of peple ther but the servis wasnt good." 

{
  "text": "I went [[h]]too[[\h]] the [[h]]stor[[\h]] and [[h]]bougt[[\h]] some [[h]]fruts[[\h]]. [[h]]Thre[[\h]] was [[h]]alots[[\h]] of peple ther but the [[h]]servis[[\h]] wasnt good.", 
  "feedback": [
    ["Spelling", "to the", "Change 'too' to 'to' for the correct spelling of 'to'."],
    ["Spelling", "store", "Change 'stor' to 'store' for the correct spelling of 'store'."],
    ["Spelling", "bought", "Change 'bougt' to 'bought' for the correct spelling of 'bought'."],
    ["Spelling", "fruits", "Change 'fruts' to 'fruits' for the correct spelling of 'fruits'."],
    ["Spelling", "There", "Change 'Thre' to 'There' for the correct spelling of 'There'."],
    ["Spelling", "lots", "Change 'alots' to 'lots' for the correct spelling of 'lots'."],
    ["Spelling", "service", "Change 'servis' to 'service' for the correct spelling of 'service'."]
  ]
}