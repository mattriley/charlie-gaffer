import React from 'react';
import data from './data.json'

class Portfolio extends React.Component {
    render() {
        var collections = data.portfolio.collections.map(collection => this.renderCollection(collection));
        return <div>{collections}</div>;
    }

    renderCollection(collection) {
        var projects = collection.projects.map(project => this.renderProject(project));
        return <div>
            <h1>{collection.title}</h1>
            {projects}
        </div>
    };

    renderProject(project) {
        var images = project.images.map(image => this.renderImage(image));

        var filmInfo = [];

        if(project.subtitle) {
            filmInfo.push(project.subtitle);
        }

        if(project.director) {
            filmInfo.push('Director: ' + project.director);
        }

        if(project.cinematographer) {
            filmInfo.push('Cinematographer: ' + project.cinematographer);
        }

        filmInfo.push('Gaffer: Charlie Moukbel');

        var fileInfoElements = filmInfo.map(item => <div>{item}</div>);

        return <div>
            <h2>{project.title}</h2>
            {images}
            <div className="film-info">
                {fileInfoElements}
            </div>
        </div>
    }

    renderImage(image) {
        var src = 'screenshots/' + image;
        return <img src={src}/>;
    }
}

export default Portfolio;