import { FC, useEffect, useState } from 'react'
import { TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import { getScore } from 'api/score'
import { IResult } from 'api/swaggerGeneratedApi'
import moment from 'moment'
import { parseToPercent } from 'utils/parseToPercent'

import CommonTable from 'components/CommonTable'
import PageTitle from 'components/PageTitle'

const Score: FC = () => {
  const [scores, setScores] = useState<IResult[]>([])

  useEffect(() => {
    const get = async (): Promise<void> => {
      const scoresResponse = await getScore()
      setScores(scoresResponse)
    }

    void get()
  }, [])

  return (
    <>
      <PageTitle title="Score" />
      <CommonTable label="quizzes" minWidth={650}>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell align="left">Passing by</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {scores?.map(score => (
            <TableRow key={score.uid} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {score.quiz?.title}
              </TableCell>
              <TableCell align="left">{score.user?.fullName}</TableCell>
              <TableCell align="left">{moment(score.finishedAt).format('LLL')}</TableCell>
              <TableCell>{parseToPercent(score?.score ?? '')}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </CommonTable>
    </>
  )
}

export default Score
