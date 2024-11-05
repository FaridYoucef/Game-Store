function getCookie(name) {
  let cookieValue = null;
  console.log("All Cookies:", document.cookie); 
  if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].trim();
          console.log("Processing cookie:", cookie); 
          // Does this cookie string begin with the name we want?
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              console.log("Found CSRF Token:", cookieValue);
              break;
          }
      }
  } else {
      console.log("No cookies found");
  }
  return cookieValue;
}

export default getCookie;
