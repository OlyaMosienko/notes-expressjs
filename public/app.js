document.addEventListener('click', event => {
    if (event.target.dataset.type === 'remove') {
        const id = event.target.dataset.id

        remove(id).then(() => {
            event.target.closest('li').remove()
        })
    }
    if (event.target.dataset.type === 'edit') {
        const id = event.target.dataset.id

        const newTitle = prompt('Write a new title');
        if (newTitle) {
            update(id, newTitle).then(() => {
                const note = event.target.closest('li');
                note.querySelector('span').innerHTML = newTitle;
            })
        }
    }
})


async function remove(id) {
    await fetch(`/${id}`, {method: 'DELETE'})
}
async function update(id, title) {
    await fetch(`/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
            id,
            title
        })
    })
}