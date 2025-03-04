document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded");

    const searchForm = document.getElementById('search-form');
    const saveJobsButton = document.getElementById('save-jobs-button');
    
    if (searchForm) {
        searchForm.addEventListener('submit', event => {
            event.preventDefault();
            const keyword = document.getElementById('search-keyword').value;
            console.log("Search initiated with keyword:", keyword);
            fetchExternalJobs(keyword);
        });
    } else {
        console.error("Search form not found in the DOM.");
    }

    if (saveJobsButton) {
        saveJobsButton.addEventListener('click', saveSelectedJobs);
    } else {
        console.error("Save jobs button not found in the DOM.");
    }

    fetchSavedJobs(); // Fetch saved jobs on page load
});

// Chart instance
let jobChart;

async function fetchExternalJobs(keyword) {
    console.log("Fetching jobs for keyword:", keyword);
    try {
        const response = await fetch(`http://localhost:3000/api/externalJobs/${keyword}`);
        if (!response.ok) throw new Error('Error fetching jobs');
        const jobs = await response.json();
        console.log("Jobs received:", jobs);
        displayJobs(jobs, "Search Results from USAJobs", true); // Pass 'true' to enable checkbox
        displayJobChart(jobs, "Job Distribution from Search Results");
    } catch (error) {
        console.error("Error fetching jobs:", error.message);
        displayError("Error fetching jobs. Please try again later.");
    }
}

async function fetchSavedJobs() {
    console.log("Fetching saved jobs...");
    try {
        const response = await fetch('http://localhost:3000/api/getJobs');
        if (!response.ok) throw new Error('Error fetching saved jobs');
        const jobs = await response.json();
        console.log("Saved jobs received:", jobs);
        displayJobs(jobs, "Saved Jobs");
    } catch (error) {
        console.error("Error fetching saved jobs:", error.message);
        displayError("Error fetching saved jobs. Please try again later.");
    }
}

function displayJobs(jobs, title, showCheckbox = false) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `<h2>${title}</h2>`;

    const ul = document.createElement('ul');

    jobs.forEach(job => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>${job.title}</strong> - ${job.company} <br>
            Location: ${job.location} <br>
            Posted on: ${job.posted_date} <br>
            <a href="${job.url}" target="_blank">View Job</a>
        `;

        // Add checkbox if needed
        if (showCheckbox) {
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.dataset.job = JSON.stringify(job); // Store job data in the checkbox
            li.prepend(checkbox); // Add checkbox at the start of the list item
        }

        // Add delete button if on saved.html
        if (title === "Saved Jobs") {
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.onclick = () => deleteJob(job.id); // Use the deleteJob function
            li.appendChild(deleteButton);
        }

        ul.appendChild(li);
    });

    resultsDiv.appendChild(ul);

    // Show the "Save Selected Jobs" button if checkboxes are enabled
    const saveJobsButton = document.getElementById('save-jobs-button');
    if (showCheckbox && saveJobsButton) {
        saveJobsButton.style.display = 'block';
    }

}

function displayError(message) {
    const resultsSection = document.getElementById('results');
    if (!resultsSection) {
        console.error("Results section not found in the DOM.");
        return;
    }
    resultsSection.innerHTML = `<p class="error">${message}</p>`;
}

// Display Chart
function displayJobChart(jobs, chartTitle) {
    const chartContainer = document.getElementById('chart-container');
    if (!chartContainer) {
        console.error("Chart container not found in the DOM.");
        return;
    }

    // Extract job data for the chart
    const companies = {};
    jobs.forEach(job => {
        companies[job.company] = (companies[job.company] || 0) + 1;
    });

    const labels = Object.keys(companies);
    const data = Object.values(companies);

    // Show the chart container
    chartContainer.style.display = 'block';

    // Destroy previous chart if it exists
    if (jobChart) {
        jobChart.destroy();
    }

    // Create a new chart
    const ctx = document.getElementById('jobChart').getContext('2d');
    jobChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels,
            datasets: [{
                label: 'Number of Jobs',
                data,
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                },
                title: {
                    display: true,
                    text: chartTitle,
                }
            }
        }
    });
}

// Function to save selected jobs to the backend
async function saveSelectedJobs() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    const jobsToSave = [];

    checkboxes.forEach(checkbox => {
        // Each checkbox stores job details in its dataset
        const jobData = JSON.parse(checkbox.dataset.job);
        jobsToSave.push(jobData);
    });

    try {
        for (const job of jobsToSave) {
            const response = await fetch('http://localhost:3000/api/addJob', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(job),
            });

            if (!response.ok) throw new Error('Failed to save job');
        }
        Swal.fire('Success', 'Selected jobs saved successfully!', 'success'); // alert message
    } catch (error) {
        console.error('Error saving jobs:', error);
        Swal.fire('Error', 'Error saving jobs. Please try again later.', 'error'); // alert message
    }
}

//Function to delete saved jobs
async function deleteJob(jobId) {
    try {
        const response = await fetch(`http://localhost:3000/api/deleteJob/${jobId}`, {
            method: 'DELETE',
        });

        if (!response.ok) throw new Error('Failed to delete job');

        Swal.fire('Success', 'Job deleted successfully!', 'success'); // alert message
        fetchSavedJobs(); // Refresh the saved jobs list
    } catch (error) {
        console.error('Error deleting job:', error);
        Swal.fire('Error', 'Error deleting job. Please try again later.', 'error'); // alert message
    }
}
