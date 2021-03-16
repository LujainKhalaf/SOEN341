async function deletePost(e) {
    const postId = await e.getAttribute('data-post-id');
    const formData = new FormData();
    formData.append('post_id', postId);

    // Close Bootstrap modal
    $(`#post-modal-${postId}`).modal('hide')

    await fetch('/delete-post', {
        method: 'DELETE',
        body: formData
    });

    const gridItem = await document.getElementById(`post-grid-item-${postId}`);
    gridItem.parentNode.removeChild(gridItem);

    const modalItem = document.getElementById(`post-modal-${postId}`);
    modalItem.parentNode.removeChild(modalItem)

    let postCount = parseInt(document.getElementById("profile-post-count").innerText);
    let updatedPostCount = postCount - 1;

    document.getElementById('profile-post-count').innerText = updatedPostCount;

    if (updatedPostCount === 0) {
        document.getElementById("upload-first").classList.remove("invisible")
    }
}

$('.posts').infiniteScroll({
    path: function() {
            return `/next-feed`;
    },
    append: '.card',
    history: false
});

function previewImage(event) {
    const preview = document.getElementById('preview-image');
    preview.src = URL.createObjectURL(event.target.files[0]);
    preview.style.display = "block";
}

function commentReadMore(e) {
    const splicedCommentElement = e.parentElement;
    const fullCommentElement = $("#" + splicedCommentElement.getAttribute("id") + "> span.more-text");

    // Remove "... more"
    e.remove();

    const fullCommentText = fullCommentElement.text();
    fullCommentElement.remove();

    splicedCommentElement.innerText = fullCommentText
}
