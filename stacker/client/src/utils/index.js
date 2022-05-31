export const getParam = () => {
    const hashParams = {};
    let e, r = /([^&;=]+)=?([^&;]*)/g,
        sub = window.location.hash.substring(1);
    while (e = r.exec(sub)){
        hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
}

export const converMStoMinutes = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000).toFixed(0);
    return `${minutes}:${(seconds < 10 ? '0' : '')}${seconds}`
  }