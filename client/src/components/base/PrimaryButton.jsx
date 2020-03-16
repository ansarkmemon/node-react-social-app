import React from 'react'
import { Button } from 'semantic-ui-react';

const PrimaryButton = ({ type = "submit", fluid = true, content, ...props }) => {
  return (
    <Button type="submit" fluid={fluid} content={content} className="sc-button" {...props}/>
  )
}

export default PrimaryButton
