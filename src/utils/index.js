export const setCookie =(cname, cvalue, exdays) => {  
  var d = new Date();  
  d.setTime(d.getTime() + (exdays*24*60*60*1000));  
  var expires = "expires="+d.toUTCString();  
  document.cookie = cname + "=" + cvalue + "; " + expires;  
}  
export const getCookie =(cname) => {  
  var name = cname + "=";  
  var ca = document.cookie.split(';');  
  for(var i = 0; i<ca.length; i++) {  
    var c = ca[i];  
    while (c.charAt(0) === ' ') c = c.substring(1);  
    if (c.indexOf(name) !== -1) return c.substring(name.length, c.length);  
  }  
  return ""; 
} 

export const setStore = (name, content) => {
	if (typeof content !== 'string') {
		content = JSON.stringify(content);
	}
	window.sessionStorage.setItem(name, content);
}

export const getStore = (name, isObject = false) => {
  let content;
  if (isObject) {
    content = JSON.parse(window.sessionStorage.getItem(name));
  }else {
    content = window.sessionStorage.getItem(name);
  }
	return content;
}

export const removeStore = name => {
	if (!name) return;
	window.sessionStorage.removeItem(name);
}
