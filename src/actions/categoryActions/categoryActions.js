const getAllCategories = async ()=>{
  const response = await fetch(`http://localhost:8081/api/v1/get/all/categories`)
  const data = await response.json()
  return data
}

const postCategory = async (category) => {
  const response = await fetch(`http://localhost:8081/api/v1/save/category`,
  {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(category)
  })
  const data = await response.json();
  return data
}

const deleteCategoryBack = async (id) => {
  const response = await fetch(`http://localhost:8081/api/v1/delete/category/${id}`,
  {
    method: 'DELETE'
  })
  return response
}


export {getAllCategories, postCategory, deleteCategoryBack}