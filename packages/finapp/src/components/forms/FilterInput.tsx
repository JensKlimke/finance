import {useMemo, useState} from "react";
import {Dropdown, Form} from "react-bootstrap";

interface FilterInputProps {
  value : string
  update : (value: string) => void
  list : string[] | undefined
}

export default function FilterInput({value, update, list} : FilterInputProps) {
  const [show, setShow] = useState(false);
  const itemList = useMemo(() => {
    return list && list
      .filter(e => e.startsWith(value))
      .filter((v, i, a) => a.indexOf(v) === i)
      .sort((a, b) => a.localeCompare(b));
  }, [list]);
  return (
    <Form.Group
      onFocus={() => setShow(true)}
      onBlur={() => setShow(false)}
    >
      <Form.Control
        value={value}
        onChange={(e) => update(e.target.value)}
        type="text"
        placeholder="Item"
      />
      {
        itemList && itemList.length > 0 && (
          <Dropdown.Menu show={show}>
            {
              itemList.map(e =>
                <Dropdown.Item
                  key={e}
                  eventKey={e}
                  onClick={() => {update(e); setShow(false)}}
                  active={e === 'value'}
                >
                  {e}
                </Dropdown.Item>
              )
            }
          </Dropdown.Menu>
        )
      }
    </Form.Group>
  )
}