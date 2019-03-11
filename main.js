
const octokitModule = require('@octokit/rest');
const octokit = new octokitModule();

fetchReposFromOrg("invisible-tech").then(async (response) => {
    console.log(Object.keys(response[0]));
    const prs = await fetchPRsfromRepo(response[0]);
    console.log(JSON.stringify(prs, null, 2));
});


async function fetchReposFromOrg (orgName) {
    if (orgName) {
        const result = await octokit.repos.listForOrg({org: orgName, type: "public"});
        return result.data ? result.data : [];
    }
    return [];
}

async function fetchPRsfromRepo ({owner, name}) {
    if (owner && name) {
        const result = await octokit.pulls.list({owner: owner.login, repo: name, state: "all"});
        return result ? result.data : [];
    }
    return [];
}


