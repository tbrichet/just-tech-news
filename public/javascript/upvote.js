async function upvoteClickHandler(event) {
  event.preventDefault();

    // Split URL string to get the post_id
  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  const response = await fetch('/api/posts/upvote', {
  method: 'PUT',
  body: JSON.stringify({
    post_id: id
  }),
  headers: {
    'Content-Type': 'application/json'
  }
});

if (response.ok) {
  document.location.reload();
} else {
  alert(response.statusText);
}
}