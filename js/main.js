const input = document.getElementById('tags-list__input');
const button = document.getElementById('main__button');
const checkbox = document.getElementById('main__checkbox');
const list = document.getElementById('main__tags-list');


class TagsList {
    #tags = [];
    #readonly = false;

    constructor() {
        this.setTags(JSON.parse(localStorage.getItem('tags')) || []);
    }

    addTag = (tag) => {
        if (tag && !tag.isEmpty() && !this.getTags().includes(tag)) {
            this.setTags([...this.getTags(), tag]);
        }
    }

    removeTag = (tag) => {
        this.setTags(this.getTags().filter(item => item !== tag));
    }

    clearTags = () => {
        this.setTags([]);
    }

    getTags = () => {
        return this.#tags;
    }

    setTags = (tags) => {
        if (!this.#readonly) {
            this.#tags = tags;
            localStorage.setItem('tags', JSON.stringify(tags));
            this.reloadList();
        }
    }

    toggleReadOnly = (status) => {
        this.#readonly = status;
        button.disabled = status;
        input.disabled = status;
    }

    reloadList = () => {
        while (list.firstChild && list.firstChild !== input) {
            list.firstChild.remove();
        }
        for (let tag of this.getTags()) {
            let newTag = document.createElement('span');
            newTag.textContent = tag;
            newTag.className = 'tags-list__element';
            newTag.onclick = () => {
                this.removeTag(tag);
            }
            list.insertBefore(newTag, input);
        }
    }
}

const tagEvent = (event) => {
    if ((event.type === 'keydown' && event.key === 'Enter') || (event.type === 'click')) {
        event.preventDefault();
        tagList.addTag(input.value);
        input.value = '';
    }
}

const tagList = new TagsList();

input.onkeydown = tagEvent;
button.onclick = tagEvent;
checkbox.onchange = event => {
    tagList.toggleReadOnly(event.currentTarget.checked);
};

String.prototype.isEmpty = function () {
    return (this.length === 0 || !this.trim());
};
