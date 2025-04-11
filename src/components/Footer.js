export const Footer = ({ version, buildTime }) => {
  return (
    <footer className="footer mt-6">
      <div className="columns mx-4">
        <div className="column is-half">
          <p className="mb-2">
            <a
              className="has-text-white is-uppercase is-size-7"
              target="_blank"
              rel="noreferrer"
              href="https://gitlab.com/hctrdev/phasmophobia-guide"
            >
              <span className="icon mr-3">
                <i className="fa fa-gitlab" />
              </span>
              Code on Gitlab
            </a>
          </p>
          <p>
            <a
              className="has-text-white is-uppercase is-size-7"
              target="_blank"
              rel="noreferrer"
              href="https://umami.is/"
            >
              <span className="icon mr-3">
                <i className="fa fa-line-chart" />
              </span>
              Analytics by Umami
            </a>
          </p>
        </div>
        <div className="column is-half">
          <VersionData version={version} buildTime={buildTime} />
        </div>
      </div>
    </footer>
  )
}

const VersionData = ({ version, buildTime }) => {
  if (
    (version === undefined || version === '') &&
    (buildTime === undefined || buildTime === '')
  ) {
    return ''
  }
  return (
    <div className="has-text-right">
      <p className="has-text-white is-uppercase is-size-7 mb-2">
        {version}
        <span className="icon ml-3">
          <i className="fa fa-code" />
        </span>
      </p>
      <p className="has-text-white is-uppercase is-size-7">
        Built on {buildTime}
        <span className="icon ml-3">
          <i className="fa fa-calendar" />
        </span>
      </p>
    </div>
  )
}

export default Footer
