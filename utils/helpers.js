// Helper Functions that are Called by Handlebars

// Format Date
module.exports = {
  format_date: date => {
    return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(
      date
    ).getFullYear()}`;
  }
}

// Pluralize Words
module.exports = {
  format_date: date => {
    // same logic as before...
  },
  format_plural: (word, amount) => {
    if (amount !== 1) {
      return `${word}s`;
    }

    return word;
  }
}

// Format URL and shorten if needed
format_url: url => {
  return url
    .replace('http://', '')
    .replace('https://', '')
    .replace('www.', '')
    .split('/')[0]
    .split('?')[0];
},