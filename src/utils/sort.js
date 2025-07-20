const sortTutors = (tutors) => {
    return tutors.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

export { sortTutors };