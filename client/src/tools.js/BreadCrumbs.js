import Breadcrumb from 'react-bootstrap/Breadcrumb';

// us this or else to show stepts from finding an item to user found 


function BreadcrumbExample() {
  return (
    <Breadcrumb>
      <Breadcrumb.Item href="#">Item Details </Breadcrumb.Item>
      <Breadcrumb.Item href="https://getbootstrap.com/docs/4.0/components/breadcrumb/">
        Library
      </Breadcrumb.Item>
      <Breadcrumb.Item active>Data</Breadcrumb.Item>
    </Breadcrumb>
  );
}

export default BreadcrumbExample;