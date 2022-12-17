import React from 'react'

function NavBar({darkMode, setDarkMode}) {
  return (
    <div onClick={setDarkMode=false}>Dark/ light</div>
  )
}

export default NavBar