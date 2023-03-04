export function notify() {
    document.getElementById("notification").style.display = "block";
    setTimeout(() => {
        document.getElementById("notification").style.display = "none";
    }
    , 3000);
    
}