import React from 'react';

const About = () => {
    return (
        <div className="container">
            <h1>À propos</h1>
            <hr/>

            <p>
               Un blog plutôt rustique | Dimanche 04 décembre 2022
            </p>

            <hr/>

            <p>
                PyBlog est un blog créé avec le framework Flask dans le cadre d'un projet personnel.
                Mon objectif en faisant ce projet était d'appliquer mes acquis tout en me lançant sur un nouveau framework.
            </p>

            <p>
                Je suis en deuxième année à Hetic (Montreuil) en Bachelor Concepteur Développeur de solutions digitales.
                J'effectue actuellement une alternance en tant que développeur backend Laravel chez <a target="_blank" rel="noopener noreferrer" href="https://www.tylto.com/" >Tylto</a> pour une durée de 2 ans.
            </p>

            <p>
                Merci d'avoir pris le temps de lire ce message. Si vous avez des questions, n'hésitez pas à me contacter via <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/rijentha/"> LinkedIn </a> 
                et si vous voulez voir mes autres projets, voici le lien de mon <a target="_blank" rel="noopener noreferrer" href="https://github.com/Rijenth/">Github</a>.
            </p>
        </div>
    );
};

export default About;