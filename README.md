# Server Statistics Dashboard for GitHub Enterprise Server

The GitHub Enterprise Server Dashboard is a sample implementation of a dashboard for GitHub Enterprise Server. It provides server statistics and collects aggregate usage data from your GitHub Enterprise Server instance, allowing you to better anticipate the needs of your organization, understand how your team works, and demonstrate the value you get from GitHub Enterprise Server.

[Watch the YouTube video :video_camera:](https://youtu.be/watch?feature=player_embedded&v=fiAol8zS3YE)
<a href="https://youtu.be/watch?feature=player_embedded&v=fiAol8zS3YE" target="_blank">
 <img src="images/youtube-thumbnail-with-play-button.png" alt="Watch the video" width="100%" />
</a>

## Features

- Collect and display server statistics for GitHub Enterprise Server
- Aggregate usage data for repositories, issues, pull requests, and more
- Gain insights into your enterprise server's usage and user dynamics
- Show the information of GitHub Enterprise Server

<img src="images/screen-shot.png" width="100%" border="" />

## Installation

To install and run the GitHub Enterprise Server Dashboard, follow these steps:

1. Fork the repository to your desired organization to host the dashboad with GitHub Pages
2. Set GitHub Personal Access Token in the GitHub Action's secret ```GH_PAT```
3. Set the Enterprise Name in the GitHub Action's secret ```ENTERPRISE_NAME```
4. Then, GitHub Actions run the workflow and dashboard is deployed to the GitHub Pages
5. Access the dashboard page in GitHub Pages

## Build

To build the GitHub Enterprise Server Dashboard, follow these steps:

1. Install packages ```npm install```
2. Copy the downloaded server statistics json file ```cp <YOUR_DOWNLOADED_FILE> ./stats-export.json```
3. Run conversion script ```npm run convert-data stats-export.json```
4. Run the server ```npm start```

## Fork and CI/CD

To fork this repository and run in your environment, follow these steps:

1. Fork the repository
2. Set your PAT with `read:enterprise` permission to GitHub Actions `GH_SECRET`
3. Set your enterprise name to GitHub Actions Secret `ENTERPRISE_NAME`
4. Run the GitHub Actions workflow manually (or you can customize the condition)

Sample condition
```
on:
  schedule:
    # Run the process at 02:00 in UTC
    - cron: '0 2 * * 1'
```
## Contributing

We welcome contributions to the GitHub Enterprise Server Dashboard project. To contribute, please follow these steps:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/new-feature`
3. Make your changes and commit them: `git commit -m 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Create a new pull request

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgements

We would like to thank the GitHub community for their support and contributions to this project.
