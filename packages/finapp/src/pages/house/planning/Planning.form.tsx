import React, {FormEvent, useMemo} from "react";
import {ItemType, useItems} from "./Planning.context";
import {Col, Form, Row} from "react-bootstrap";
import {UpdateCallbackType} from "../../../hooks/entry";
import AmountInput from "../../../components/forms/AmountInput";
import CurrencyCell from "../../../components/display/CurrencyCell";
import FilterInput from "../../../components/forms/FilterInput";


export default function ItemsForm({entry, handleSubmit, update}: {
  entry: ItemType,
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void,
  update: UpdateCallbackType<ItemType>
}) {
  const planningSum = useMemo(() => {
    return entry.units * entry.unitPrice + entry.area * entry.areaPrice;
  }, [entry.units, entry.unitPrice, entry.area, entry.areaPrice]);
  const {data} = useItems();
  return (
    <Form onSubmit={(e) => handleSubmit(e)} id='entryForm' method='post'>
      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control
          autoFocus
          value={entry.description}
          onChange={(e) => update('description', e.target.value)}
          type="text"
          placeholder="My Item"
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Group</Form.Label>
        <FilterInput
          value={entry.group || ''}
          update={(value) => update('group', value)}
          list={data && data.map(e => e.group || '')}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Units</Form.Label>
        <Row>
          <Col>
            <Form.Control
              value={entry.units}
              onChange={(e) => update('units', e.target.value)}
              type="text"
              placeholder="5"
            />
          </Col>
          <Col>
            <AmountInput
              value={entry.unitPrice}
              onChange={(v) => update('unitPrice', v)}
            />
          </Col>
        </Row>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Area</Form.Label>
        <Row>
          <Col>
            <Form.Control
              value={entry.area}
              onChange={(e) => update('area', e.target.value)}
              type="text"
              placeholder="10.75"
            />
          </Col>
          <Col>
            <AmountInput
              value={entry.areaPrice}
              onChange={(v) => update('areaPrice', v)}
            />
          </Col>
        </Row>
        <Form.Group className="mb-3">
          <Form.Label>Planning Sum</Form.Label>
          <h3>{
            isNaN(planningSum) ?
              <span className='text-danger'>Cannot calculate planning sum</span> :
              <CurrencyCell amount={planningSum}/>
          }</h3>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Comment</Form.Label>
          <Form.Control
            value={entry.comment}
            onChange={(e) => update('comment', e.target.value)}
            type="text"
            placeholder="There is a comment to make ..."
          />
        </Form.Group>
      </Form.Group>
    </Form>
  )
}

