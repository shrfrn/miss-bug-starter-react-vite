import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

const STORAGE_KEY = 'bugDB'

export const bugService = {
    query,
    getById,
    save,
    remove,
}

_createBugs()

function query() {
    return storageService.query(STORAGE_KEY)
}

function getById(bugId) {
    return storageService.get(STORAGE_KEY, bugId)
}

function remove(bugId) {
    return storageService.remove(STORAGE_KEY, bugId)
}

function save(bug) {
    if (bug._id) {
        return storageService.put(STORAGE_KEY, bug)
    } else {
        return storageService.post(STORAGE_KEY, bug)
    }
}

function _createBugs() {
    var bugs = utilService.loadFromStorage(STORAGE_KEY)
    if (bugs && bugs.length) return

    const bugTitles = [
        `Can't save to storage`,
        `Host not responding`,
        `Invalid date error`,
        `Authentication failed`,
        `No permisions set on user`
    ]
    bugs = bugTitles.map(title => _createBug(title))
    utilService.saveToStorage(STORAGE_KEY, bugs)
}

function _createBug(title) {
    return {
        _id: utilService.makeId(),
        title,
        severity: utilService.getRandomIntInclusive(1, 5),
    }
}