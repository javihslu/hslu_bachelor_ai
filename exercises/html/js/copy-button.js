// Copy button functionality for code blocks
// Adds a copy button to each <pre> element on the page

function addCopyButton(pre) {
    // Prevent adding duplicate buttons
    if (pre.querySelector(".copy-code-btn")) return;

    // Create button element
    const button = document.createElement("button");
    button.type = "button";
    button.className = "copy-code-btn";
    button.textContent = "📋";
    button.setAttribute("aria-label", "Copy code to clipboard");

    // Add click handler for copying
    button.addEventListener("click", async () => {
        const code = pre.querySelector("code")?.innerText;
        if (!code) return;

        try {
            await navigator.clipboard.writeText(code);
            button.textContent = "Copied!";
            button.classList.add("copied");

            // Reset after 1.2 seconds
            setTimeout(() => {
                button.textContent = "📋";
                button.classList.remove("copied");
            }, 1200);
        } catch (err) {
            button.textContent = "Failed";
        }
    });

    pre.appendChild(button);
}

// Add buttons to all existing <pre> elements when page loads
document.querySelectorAll("pre").forEach(addCopyButton);

// Observe DOM for dynamically added <pre> elements
// This handles code blocks inside <details> that may load later
const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
        mutation.addedNodes.forEach((node) => {
            // Skip if not an element node
            if (node.nodeType !== 1) return;

            // Check if the node itself is a pre element
            if (node.matches?.("pre")) {
                addCopyButton(node);
            } else {
                // Check for pre elements within the added node
                node.querySelectorAll?.("pre").forEach(addCopyButton);
            }
        });
    }
});

// Start observing the document body for changes
observer.observe(document.body, {
    childList: true,
    subtree: true
});
