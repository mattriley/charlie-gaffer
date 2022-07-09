const React = require('react');

module.exports = ({ config }) => {

    return class Portfolio extends React.Component {
        render() {
            var collections = config.portfolio.collections.map((collection, i) => this.renderCollection(collection, i));
            return <div className="portfolio">{collections}</div>;
        }

        renderCollection(collection, i) {
            var projects = collection.projects.map((project, i) => this.renderProject(project, i));
            return <div key={i} className="collection">
                <h1>{collection.title}</h1>
                {projects}
            </div>;
        }

        renderProject(project, i) {
            var images = project.images.map((image, i) => this.renderImage(image, i));

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

            var fileInfoElements = filmInfo.map((item, i) => <div key={i}>{item}</div>);

            return <div key={i} className="project">
                <h2>{project.title}</h2>
                {images}
                <div className="project-details">
                    {fileInfoElements}
                </div>
            </div>;
        }

        renderImage(image, i) {
            var src = 'screenshots/' + image;
            return <img key={i} src={src} />;
        }
    };
};
