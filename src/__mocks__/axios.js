export default { 
    post : jest.fn(() => Promise.resolve({data: {}})),
    get : jest.fn(() => Promise.resolve({data: {}})),
    delete : jest.fn(() => Promise.resolve({data: {}})),
    patch : jest.fn(() => Promise.resolve({data: {}}))
}
