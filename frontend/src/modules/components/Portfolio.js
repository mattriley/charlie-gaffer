const React = require('react');

module.exports = ({ config }) => {

    return class Portfolio extends React.Component {
        render() {
            var collections = config.portfolio.collections.map(collection => this.renderCollection(collection));
            return <div className="portfolio">{collections}</div>;
        }

        renderCollection(collection) {
            var projects = collection.projects.map(project => this.renderProject(project));
            return <div className="collection">
                <h1>{collection.title}</h1>
                {projects}
            </div>;
        }

        renderProject(project) {
            var images = project.images.map(image => this.renderImage(image));

            var filmInfo = [];

            if (project.subtitle) {
                filmInfo.push(project.subtitle);
            }

            if (project.director) {
                filmInfo.push('Director: ' + project.director);
            }

            if (project.cinematographer) {
                filmInfo.push('Cinematographer: ' + project.cinematographer);
            }

            filmInfo.push('Gaffer: Charlie Moukbel');

            var fileInfoElements = filmInfo.map(item => <div>{item}</div>);

            return <div className="project">
                <h2>{project.title}</h2>
                {images}
                <div className="project-details">
                    {fileInfoElements}
                </div>
            </div>;
        }

        renderImage(image) {
            var src = 'screenshots/' + image;
            return <img src={src} />;
        }
    };
};
