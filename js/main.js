const input = document.getElementById('tags-list__input');
const button = document.getElementById('main__button');
const checkbox = document.getElementById('main__checkbox');
const list = document.getElementById('main__tags-list');


class TagsList {
    #tags = [];
    #readonly = false;

    constructor() {
        this.tags = JSON.parse(localStorage.getItem('tags')) || [];
    }

    get tags() {
        return this.#tags;
    }

    set tags(tags) {
        if (!this.readonly) {
            this.#tags = tags;
            localStorage.setItem('tags', JSON.stringify(tags));
            this.reloadList();
        }
    }

    get readonly() {
        return this.#readonly;
    }

    set readonly(value) {
        this.#readonly = value;
        button.disabled = value;
        input.disabled = value;
    }


    addTag = (tag) => {
        if (tag && !tag.isEmpty() && !this.tags.includes(tag)) {
            this.tags = [...this.tags, tag];
        }
    }

    removeTag = (tag) => {
        this.tags = this.tags.filter(item => item !== tag);
    }


    reloadList = () => {
        while (list.firstChild && list.firstChild.nodeName !== 'INPUT') {
            list.firstChild.remove();
        }
        for (let tag of this.tags) {
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

const tagList = new TagsList();

input.onkeydown = event => {
    if (event.key === 'Enter') {
        event.preventDefault();
        tagList.addTag(input.value);
        input.value = '';
    }
};
button.onclick = () => {
    tagList.addTag(input.value);
    input.value = '';
};
checkbox.onchange = event => {
    tagList.readonly = event.currentTarget.checked;
};

String.prototype.isEmpty = function () {
    return (this.length === 0 || !this.trim());
};
