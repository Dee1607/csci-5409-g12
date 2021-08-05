import React, { Component } from 'react'
import PageHeader from "../components/PageHeader.js"
export class Credits extends Component {
    render() {
        return (
            <div className="page-container to-do-list-container">
                <div className="page-header-container">
                    <PageHeader title="Credits" subtitle="" />
                </div>
                <div className="page-content-container">
                    <div className="page-content">
                        <div className="add-credits-container">
                            <div className="add-credits-content">
                                <i class="fas fa-sack-dollar"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Credits
