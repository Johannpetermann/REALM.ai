document.getElementById('modelForm').addEventListener('submit', async function(e) {
    e.preventDefault(); // Prevent the default form submission
    
    const submitButton = document.getElementById('submitButton');
    const loadingIndicator = document.getElementById('loading');
    const resultDisplay = document.getElementById('result');

    loadingIndicator.style.display = 'block'; // Show loading indicator
    submitButton.disabled = true; // Disable submit button

    const formData = new FormData(document.getElementById('modelForm'));

    try {
        const response = await fetch('/submit-model', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(Object.fromEntries(formData))
        });

        if (!response.ok) throw new Error('Submission failed');

        const result = await response.json();
        loadingIndicator.style.display = 'none'; // Hide loading indicator
        submitButton.disabled = false; // Enable submit button

        // Update the result display
        resultDisplay.innerHTML = `
            <p>Verification Result: ${result.message}</p>
            <p>Gas Used: ${result.details.gasUsed}</p>
            <p>Transaction ID: ${result.details.transactionHash}</p>
            <p>Model NFT: ${result.details.tokenId}</p>
        `;
        showToast('Data submitted successfully!');
    } catch (error) {
        console.error('Error:', error);
        loadingIndicator.style.display = 'none'; // Hide loading indicator
        submitButton.disabled = false; // Enable submit button
        showToast('Submission failed, please try again.');
    }
});

function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.className = "toast show";
    setTimeout(function(){ toast.className = toast.className.replace("show", ""); }, 3000);
}

document.getElementById('uploadForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('modelFile', document.getElementById('modelFile').files[0]);

    try {
        const response = await fetch('/upload-model', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();
        document.getElementById('resultDisplay').textContent = `Upload result: ${result.data.description}`;
    } catch (error) {
        console.error('Upload failed:', error);
    }
});

document.getElementById('revalidateForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const data = {
        tokenId: document.getElementById('tokenId').value,
        accuracy: document.getElementById('newAccuracy').value,
        recall: document.getElementById('newRecall').value,
        f1Score: document.getElementById('newF1Score').value
    };

    try {
        const response = await fetch('/revalidate-model', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        document.getElementById('resultDisplay').textContent = `Revalidation result: ${result.message}`;
    } catch (error) {
        console.error('Revalidation failed:', error);
    }
});

document.getElementById('resultForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const tokenId = document.getElementById('resultTokenId').value;

    try {
        const response = await fetch(`/model-result/${tokenId}`);
        const result = await response.json();
        document.getElementById('resultDisplay').textContent = `Model Results: Accuracy - ${result.data.accuracy}`;
    } catch (error) {
        console.error('Error fetching model results:', error);
    }
});




