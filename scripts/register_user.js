document.getElementById("registrationForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const fullName = document.getElementById("full_name").value;
    const email = document.getElementById("email").value;
    const isBlocked = document.getElementById("is_blocked").checked;
    
    const userData = {
        full_name: fullName,
        email: email,
        is_blocked: isBlocked
    };
    
    fetch("http://127.0.0.1:8000/users/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            console.log("User registered successfully:", data);
            alert("User registered successfully!");
        })
        .catch(error => {
            console.error("There was an error registering the user:", error.message);
            alert("There was an error registering the user. Please try again later.");
        });
});