# GitHub SSH And GPG Setup

These notes help the project owner push updates from a local machine without relying on browser-only GitHub edits.

## 1. Create An SSH Key For GitHub

Open PowerShell and run:

```powershell
ssh-keygen -t ed25519 -C "your-email@example.com"
```

When asked for a file path, press Enter for the default path or use a dedicated name such as:

```text
C:\Users\Administrator\.ssh\github_freewebpanel_ed25519
```

Start the SSH agent and add the key:

```powershell
Start-Service ssh-agent
ssh-add C:\Users\Administrator\.ssh\github_freewebpanel_ed25519
```

Show the public key:

```powershell
Get-Content C:\Users\Administrator\.ssh\github_freewebpanel_ed25519.pub
```

Copy the output into GitHub:

```text
GitHub -> Settings -> SSH and GPG keys -> New SSH key
```

Test SSH access:

```powershell
ssh -T git@github.com
```

## 2. Use SSH Remotes

For FreeWebPanel:

```powershell
git clone git@github.com:ResearchForumOnline/FreeWebPanel.git
cd FreeWebPanel
```

Or switch an existing checkout:

```powershell
git remote set-url origin git@github.com:ResearchForumOnline/FreeWebPanel.git
```

## 3. Optional GPG Commit Signing

Install GPG for Windows if needed, then generate a key:

```powershell
gpg --full-generate-key
```

Recommended choice:

```text
RSA and RSA, 4096 bits, no expiry or a long controlled expiry, project owner email.
```

List keys:

```powershell
gpg --list-secret-keys --keyid-format=long
```

Export the public key:

```powershell
gpg --armor --export YOUR_KEY_ID
```

Add it in GitHub:

```text
GitHub -> Settings -> SSH and GPG keys -> New GPG key
```

Configure Git signing:

```powershell
git config --global user.signingkey YOUR_KEY_ID
git config --global commit.gpgsign true
git config --global user.name "Your Name"
git config --global user.email "your-email@example.com"
```

## 4. Simpler Alternative: SSH Signing

GitHub also supports SSH commit signing. If GPG is awkward on Windows, SSH signing may be easier once the SSH key is added to GitHub as a signing key.

## 5. Security Notes

- Never share the private key file.
- Only copy the `.pub` file into GitHub.
- Keep a backup of the private key in a secure offline place if it is important.
- Use a passphrase for keys that can push to public product repos.
- Do not commit deployment secrets, payment credentials, license keys, server credentials, or private theme source.
