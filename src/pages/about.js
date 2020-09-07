import React from "react"

export default function Home() {
  return (
    <div className="container">
      <div className="nav horizontal-align">
        <div className="nav-item">
          <a href="/about">Sobre Nosotros</a>
        </div>
        <div className="nav-item">
          <a href="#services">Servicios</a>
        </div>
        <div className="nav-item">
          <a href="#team">Nuestro Equipo</a>
        </div>
        <div className="nav-item">
          <a href="#projects">Proyectos</a>
        </div>
      </div>
      <div className="center">
        <h1>Sobre Nosotros</h1>
      </div>
    </div>

  )
}
