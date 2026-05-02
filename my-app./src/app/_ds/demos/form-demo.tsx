"use client";

import { Form, FormField } from "@/components/form/form";
import { Input } from "@/components/Input/input";
import { TextArea } from "@/components/Input/textarea";
import { Checkbox } from "@/components/checkbox/checkbox";
import { Select } from "@/components/select/select";
import { Button } from "@/components/button/button/button";
import { DemoSection, demoStyles as s } from "../demo-block";

export function FormDemo() {
  return (
    <>
      <DemoSection title="Layout top" description="라벨을 필드 위에 배치하는 기본 레이아웃">
        <Form layout="top" style={{ maxWidth: 420 }}>
          <FormField label="이름" mandatory>
            <Input placeholder="홍길동" />
          </FormField>
          <FormField label="이메일" helper="회사 이메일을 입력하세요.">
            <Input type="email" placeholder="you@example.com" />
          </FormField>
          <FormField label="비밀번호" error="8자 이상 입력해주세요.">
            <Input type="password" tone="error" defaultValue="1234" />
          </FormField>
          <FormField label="동의">
            <Checkbox>이용약관에 동의합니다.</Checkbox>
          </FormField>
          <div className={s.row}>
            <Button type="submit">Submit</Button>
            <Button type="button" variant="secondary-outline">
              Cancel
            </Button>
          </div>
        </Form>
      </DemoSection>

      <DemoSection title="Layout left" description="라벨을 좌측에, 컨트롤을 우측에 배치">
        <Form layout="left" labelWidth={120} style={{ maxWidth: 520 }}>
          <FormField label="팀 이름">
            <Input placeholder="Design System" />
          </FormField>
          <FormField label="소속">
            <Select placeholder="Choose" />
          </FormField>
          <FormField label="메모">
            <TextArea placeholder="자유롭게 입력..." />
          </FormField>
        </Form>
      </DemoSection>
    </>
  );
}

export default FormDemo;
