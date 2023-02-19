import React from "react";
import { Row, Col, List } from "antd";
import IconFont from "@/components/IconFont";
import logoVNG from "@/assets/images/my-vng-logo-alt.png";

const Footer = () => {
  const data = [
    {
      icon: "mail",
      title: "helpdesk@vng.com.vn",
      onClick: function () {
        window.open(
          "https://outlook.office.com/mail/deeplink/compose?to=helpdesk@vng.com.vn.vn&subject=Hỗ trợ đăng nhập My VNG&body=Hãy cho biết tài khoản nhân viên, số điện thoại và vấn đề bạn đang gặp phải để IT Helpdesk liên hệ hỗ trợ.",
          "Popup",
          "location,status,scrollbars,resizable,width=800, height=800"
        );
      }
    },
    {
      icon: "zalo",
      title: "IT Helpdesk",
      onClick: function () {
        window.open("https://zalo.me/1780205093348309874?src=qr");
      }
    }
  ];
  return (
    <>
      <Col span={10}>
        <img className="logo-alt" src={logoVNG} alt="logo" />
      </Col>
      <Col span={14}>
        <Row gutter={32}>
          <Col span={12}>
            <span>If you have login issues, please contact IT Helpdesk</span>
          </Col>
          <Col span={12}>
            <List
              grid={{ gutter: 8, column: 2 }}
              dataSource={data}
              renderItem={item => (
                <List.Item className="mb-0">
                  <div
                    className="color-white text-with-icon"
                    onClick={item.onClick}
                  >
                    <IconFont type={item.icon} size="1.571em" />
                    <span>{item.title}</span>
                  </div>
                </List.Item>
              )}
            />
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default Footer;
