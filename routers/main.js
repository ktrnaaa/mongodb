document.addEventListener('DOMContentLoaded', function() {
    fetchRandomQuestion();
  
    document.getElementById('yesButton').addEventListener('click', function() {
      sendResponse('Так');
    });
  
    document.getElementById('noButton').addEventListener('click', function() {
      sendResponse('Ні');
    });
  });
  
  function fetchRandomQuestion() {
    fetch('/random-question')
      .then(response => response.json())
      .then(data => {
        document.getElementById('question').textContent = data.text;
      })
      .catch(error => console.error('Помилка:', error));
  }
  
  function sendResponse(response) {
    fetch('/save-response', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ response: response })
    })
      .then(response => response.text())
      .then(data => console.log(data))
      .catch(error => console.error('Помилка:', error));
  }
  