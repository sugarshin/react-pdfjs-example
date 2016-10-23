import React, { Component } from 'react'
import PDF from 'react-pdf-js'

export default class App extends Component {
  state = { page: 1, pages: null }

  onDocumentComplete = pages => this.setState({ pages })

  onPageComplete = page => this.setState({ page })

  handlePrevious = () => {
    const { page, pages } = this.state
    this.setState({
      page: 1 === page ? pages : this.state.page - 1
    })
  }

  handleNext = () => {
    const { page, pages } = this.state
    this.setState({
      page: pages === page ? 1 : this.state.page + 1
    })
  }

  renderPagination() {
    return (
      <nav>
        <ul className='pager'>
          <li className='previous' onClick={this.handlePrevious}>
            <a href=''>Previous</a>
          </li>
          <li className='next' onClick={this.handleNext}>
            <a href=''>Next</a>
          </li>
        </ul>
      </nav>
    )
  }

  render() {
    return (
      <div>
        <PDF
          file='sample.pdf'
          onDocumentComplete={this.onDocumentComplete}
          onPageComplete={this.onPageComplete}
          page={this.state.page}
        />
        {this.state.pages ? this.renderPagination() : null}
      </div>
    )
  }
}
