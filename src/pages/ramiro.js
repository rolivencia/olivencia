import React from "react"
import fotoCv from "../assets/img/foto-ramiro.jpg"

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
        <h1>Ramiro Olivencia</h1>
      </div>

      <div className="curriculum-vitae">
        <div className="datos-personales">
          <div className="row">
            <div className="col-8"></div>
            <div className="col-4">
              <img src={fotoCv} alt="Ramiro Olivencia - Foto CV" width="100%"></img>
            </div>
          </div>
        </div>
        <div className="aptitudes-personales">
          <div className="center">
            {" "}
            <h2>Aptitudes Personales</h2>
          </div>
          <p>
            Me considero una persona responsable, comprometida con los planes
            que emprendo. En el ámbito de la resolución de conflictos y
            problemas asumo una postura conciliadora y negociadora; procuro
            óptimos resultados y calidad en mi gestión. Disfruto el poder
            cumplir con los objetivos laborales planteados y procuro que cada
            uno de ellos sea un hito en mi carrera profesional.
            <p>
              {" "}
              Por mi formación académica, formación práctico-laboral y mi perfil
              en lo que a manejo y gestión de proyectos se refiere, suelo tener
              un desempeño óptimo y poseo una eficaz capacidad de adaptación
              según el entorno de trabajo y las tareas asignadas.
            </p>
            <p>
              {" "}
              En el trabajo grupal, usualmente tiendo a ocupar el rol de líder,
              dada mi afinidad personal de ser quien coordina y toma decisiones
              en la gestión de proyectos, considerando a la comunicación y la
              mejora continua de los procesos de trabajo como principios
              fundamentales en mi desempeño. Cuento con amplia experiencia en el
              trabajo de proyectos basados en metodologías ágiles.
            </p>
            <p>
              {" "}
              Desempeñándome actualmente en el rol de desarrollador de software
              y líder técnico en KBC Advanced Techologies, cuento además con
              variada experiencia en otros rubros, los cuales han aportado no
              sólo a mis capacidades técnicas sino también a las vinculadas con
              trato personal y la atención al público.{" "}
            </p>
          </p>
        </div>
      </div>
    </div>
  )
}
