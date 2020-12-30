import React from 'react'
import axios from 'axios'
import moment from 'moment'
import Link from 'next/link'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import MaterialTable from 'material-table'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import useDimensions from 'react-use-dimensions'
import _ from 'lodash'

import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'

import CachedIcon from '@material-ui/icons/Cached'

const Layout = dynamic(() => import('../../components/Layout'))

const loggerURL = `https://www.lysq.click/logger`

const DATE_RANGES_OPTIONS = [
  {
    value: 'minute',
    label: 'Last minute',
  },
  {
    value: 'hour',
    label: 'Last hour',
  },
  {
    value: 'day',
    label: 'Last day',
  },
  {
    value: 'week',
    label: 'Last week',
  },
]

const ENV_OPTIONS = [
  {
    value: 'dev',
    label: 'Development',
  },
  {
    value: 'prod',
    label: 'Production',
  },
]

const valueToSeconds = val => +Number(val / 1000).toFixed(2)

const toDateNumber = date => +new Date(date)

const recordsToPoints = records => records
  .map(record => [toDateNumber(record.createdAt), valueToSeconds(record.value)])
  .sort((p1, p2) => p1[0] - p2[0])

const recordsToAveragePoints = records => {
  const dateValuePoints = records
    .map(record => ({
      date: toDateNumber(moment(new Date(record.createdAt)).format("YYYY/MM/DD HH:30")),
      value: valueToSeconds(record.value)
    }))
  
  const uniqDates = _
    .uniqBy(dateValuePoints, 'date')
    .map(point => point.date)

  return uniqDates.map(date => {
    const dateValues = dateValuePoints
      .filter(point => point.date === date)
      .map(point => point.value)

    const valuesSum = dateValues.reduce((sum, cur) => sum + cur, 0)
    return [date, valuesSum / dateValues.length]
  })
}

export default function Logger() {
  const [virginState, setVirginState] = React.useState(true)
  const [loading, setLoading] = React.useState()
  const [error, setError] = React.useState()
  const [records, setRecords] = React.useState([])
  const [currentName, setCurrentName] = React.useState('TTFB')
  const [currentRange, setCurrentRange] = React.useState(DATE_RANGES_OPTIONS[2].value)
  const [currentEnv, setCurrentEnv] = React.useState('prod')

  const [ref, pageSize] = useDimensions();

  const processRecords = React.useCallback(async data => {
    setRecords(
      data.sort((record1, record2) => {
        return (+new Date(record2.createdAt)) - (+new Date(record1.createdAt))
      })
    )
  }, [])

  const fetchRecords = React.useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const from = moment().subtract(1, currentRange).toISOString()
      const to = moment().toISOString()
      const result = await axios.get(`${loggerURL}?from=${from}&to=${to}&name=${currentName}&dev=${currentEnv === 'dev' ? 'true' : 'false'}`)
      processRecords(result.data)
      setVirginState(false)
    } catch (err) {
      setError(err.data)
      processRecords([])
    }

    setLoading(false)
  }, [currentEnv, currentRange, currentName])

  React.useEffect(() => {
    fetchRecords()
  }, [fetchRecords])

  const lookupName = React.useMemo(() => {
    const allNames = records.map(record => record.name)
    return Array.from(new Set([...allNames, 'TTFB']))
  }, [records])

  const points = React.useMemo(() => {
    return recordsToPoints(records) || []
  }, [records])

  const averagePoints = React.useMemo(() => {
    return recordsToAveragePoints(records) || []
  }, [records])

  const columns = React.useMemo(() => [
    {
      title: 'Name',
      field: 'name',
    },
    {
      title: 'URL',
      field: 'location',
    },
    {
      title: 'Value',
      field: 'value',
      render: record => Number(record.value).toFixed(2),
    },
    {
      title: 'Created At',
      field: 'createdAt',
      render: record => moment(record.createdAt).format('HH:mm DD:MM:YYYY')
    },
  ], [])

  const options = React.useMemo(() => ({
    chart: {
      zoomType: 'x',
      width: pageSize.width
    },
    title: {
      text: 'First byte (s)'
    },
    xAxis: {
      type: 'datetime'
    },
    yAxis: {
      title: {
        text: 'First byte (seconds)'
      }
    },
    // legend: {
    //   enabled: true
    // },
    plotOptions: {
      area: {
        marker: {
          radius: 2
        },
        lineWidth: 1,
        states: {
          hover: {
            lineWidth: 1
          }
        },
        threshold: null
      }
    },
    series: [
      {
        type: 'line',
        name: 'First byte (s)',
        color: '#FF0000',
        data: points,
      },
      {
        type: 'line',
        name: 'First byte average (s)',
        color: '#00FF00',
        data: averagePoints,
      },
    ]
  }), [points, averagePoints, pageSize]);

  const handleChangeName = React.useCallback(o => {
    setCurrentName(o.target.value)
  }, [])

  const handleChangeRange = React.useCallback(o => {
    setCurrentRange(o.target.value)
  }, [])

  const handleChangeEnv = React.useCallback(o => {
    setCurrentEnv(o.target.value)
  }, [])

  return (
    <Layout>
      <div className="header">
        <div className="filter">
          <Select value={currentName} onChange={handleChangeName}>
            <MenuItem key="all" value="">
              All
            </MenuItem>
            {lookupName.map(name => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
          {' '}
          <Select value={currentRange} onChange={handleChangeRange}>
            {DATE_RANGES_OPTIONS.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          {' '}
          <Select value={currentEnv} onChange={handleChangeEnv}>
            {ENV_OPTIONS.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </div>
        <IconButton onClick={fetchRecords}>
          <CachedIcon fontSize="large" className={loading ? 'rotating' : ''} />
        </IconButton>
      </div>
      {!error && !virginState && Boolean(records) && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper ref={ref}>
              <HighchartsReact
                highcharts={Highcharts}
                options={options}
              />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <MaterialTable columns={columns} data={records} />
          </Grid>
        </Grid>
      )}
      {!loading && Boolean(error) && `${error.statusCode} ${error.message}`}
      <style jsx>{`
        .header {
          padding: 15px 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
      `}</style>
    </Layout>
  )
}
