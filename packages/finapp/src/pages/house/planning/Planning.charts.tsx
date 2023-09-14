import React, {useMemo} from "react";
import {ApexOptions} from 'apexcharts'
import Chart from "react-apexcharts";
import {ItemType} from "./Planning.context";
import {Table} from "react-bootstrap";
import CurrencyCell from "../../../components/display/CurrencyCell";
import colors from '../../../assets/colors/colors.json'

export function ItemsDistributionChart({data}: { data: ItemType[] }) {

  const groups = useMemo(() => (
    data
      .map(e => e.group)
      .filter((e, i, a) => a.indexOf(e) === i)
      .map(g => ({
        name: g,
        amount: data
          .filter(d => d.group === g)
          .reduce((s, e) => s + e.area * e.areaPrice + e.units * e.unitPrice, 0.0)
      }))
  ), [data]);

  const options = useMemo<ApexOptions>(() => ({
    chart: {
      type: 'donut',
      background: 'transparent'
    },
    theme: {
      mode: 'dark'
    },
    legend: {
      show: false,
    },
    tooltip: {
      y: {
        formatter: (val: number): string => Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'EUR',
          maximumFractionDigits: 0,
        }).format(val)
      }
    },
    labels: groups.map(e => e.name),
    colors: groups.map((_, i) => colors[i]),
  }), [groups]);

  const series: ApexOptions['series'] = useMemo(() => groups.map(g => g.amount), [groups]);

  return (
    <div>
      <Chart options={options} series={series} type="donut"/>
      <hr/>
      <Table>
        <thead>
        <tr>
          <th className='w-auto'>Color</th>
          <th className='w-auto'>Group</th>
          <th className='w-auto text-end'>Amount</th>
        </tr>
        </thead>
        <tbody>
        {
          groups.map((g, i) => (
            <tr key={g.name}>
              <td className='w-auto'><span style={{backgroundColor: colors[i]}} className='ps-2'>&nbsp;</span></td>
              <td className='w-auto'>{g.name}</td>
              <td className='w-auto text-end'><CurrencyCell fracDigits={0} amount={g.amount}/></td>
            </tr>
          ))
        }
        </tbody>
      </Table>
    </div>
  );

}