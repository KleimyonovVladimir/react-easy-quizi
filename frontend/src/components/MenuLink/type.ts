import React from 'react'

export interface IProps {
  title: string
  link: string
  icon?: React.ReactNode
  classes?: Partial<{
    li: string
    link: string
    image: string
  }>
}
