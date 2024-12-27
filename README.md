<h1>GitHub Activity Fetcher</h1>

<p><strong>A program that fetches a user's activity data from GitHub using the GitHub API.</strong></p>

<h2>Table of Contents</h2>
<ul>
    <li><a href="#description">Description</a></li>
    <li><a href="#features">Features</a></li>
    <li><a href="#installation">Installation</a></li>
    <li><a href="#usage">Usage</a></li>
</ul>

<h2 id="description">Description</h2>
<p><strong>GitHub Activity Fetcher</strong> is a Node.js program that uses the GitHub API to fetch and display data about a user's activities on GitHub. By running the program, it returns information such as repositories, commits, pull requests, and other activities performed by a specific user.</p>

<h2 id="features">Features</h2>
<ul>
    <li>Fetches activity data from a GitHub user.</li>
    <li>Displays information about repositories, commits, issues, and pull requests.</li>
    <li>Easy to use via the command line.</li>
</ul>

<h2 id="installation">Installation</h2>
<h3>Prerequisites</h3>
<p><a href="https://nodejs.org" target="_blank">Node.js</a> (version 14 or higher)</p>

<h3>Installation Steps</h3>
<ol>
    <li>Clone the repository to your local machine:
        <pre><code>git clone https://github.com/your-username/github-activity-fetcher.git</code></pre>
    </li>
    <li>Navigate to the project directory:
        <pre><code>cd github-activity-fetcher</code></pre>
    </li>
    <li>Install dependencies:
        <pre><code>npm install</code></pre>
    </li>
</ol>

<h2 id="usage">Usage</h2>
<p>After installation, you can run the program to fetch a user's GitHub activity. Use the following command:</p>
<pre><code>node ./index.js &lt;username&gt;</code></pre>
<p>Replace <code>&lt;username&gt;</code> with the GitHub username of the person whose activity you want to fetch. The program will display the user's activity in the command line.</p>
<p>Example:</p>
<pre><code>node ./index.js octocat</code></pre>
<p>This will return the activities of the user "octocat" on GitHub.</p>

<p>For more information, check out the project at <a href="https://roadmap.sh/projects/github-user-activity" target="_blank">roadmap.sh</a>.</p>
