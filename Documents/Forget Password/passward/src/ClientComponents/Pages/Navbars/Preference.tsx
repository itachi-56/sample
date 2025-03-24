'use client';
import { Profile } from '@/Types/Pages/Navbar/Profile';
import React, { useState } from 'react';

interface InitialSetupContextProps {
  primary_color?: string;
  label_position?: 'top' | 'left' | 'outline';
  theme?: string;
  font_size?: string;
  height?: number;
  width?: number;
}

const PreferenceModel = (props: {
  closeModel: () => void;
  userData: Profile;
}) => {
  const [initialSetup, setInitialSetup] = useState<InitialSetupContextProps>(
    {}
  );

  const toggleTheme = (theme: string) => {
    document.documentElement.classList.remove(
      'light',
      'dark',
      'light-theme-with-first-primary',
      'light-theme-with-second-primary',
      'light-theme-with-third-primary',
      'light-theme-with-fourth-primary',
      'light-theme-with-fifth-primary',
      'light-theme-with-sixth-primary',
      'dark-theme-with-first-primary',
      'dark-theme-with-second-primary',
      'dark-theme-with-third-primary',
      'dark-theme-with-fouth-primary',
      'dark-theme-with-fifth-primary',
      'dark-theme-with-sixth-primary'
    );
    document.documentElement.classList.add(theme);
    setInitialSetup((prev) => ({ ...prev, ['theme']: theme }));
  };

  const togglePrimary = (
    primary_color: string,
    primary_color_shade: string
  ) => {
    document.documentElement.classList.remove(
      'first-primary-color',
      'second-primary-color',
      'third-primary-color',
      'fourth-primary-color',
      'fifth-primary-color',
      'sixth-primary-color',
      'light-theme-with-first-primary',
      'light-theme-with-second-primary',
      'light-theme-with-third-primary',
      'light-theme-with-fourth-primary',
      'light-theme-with-fifth-primary',
      'light-theme-with-sixth-primary',
      'dark-theme-with-first-primary',
      'dark-theme-with-second-primary',
      'dark-theme-with-third-primary',
      'dark-theme-with-fouth-primary',
      'dark-theme-with-fifth-primary',
      'dark-theme-with-sixth-primary'
    );

    document.documentElement.classList.add(primary_color, primary_color_shade);
    setInitialSetup((prev) => ({ ...prev, primary_color: primary_color }));
  };

  const toggleFontSize = (fontSize: string) => {
    document.documentElement.classList.remove(
      'font-size-small',
      'font-size-medium',
      'font-size-high'
    );
    document.documentElement.classList.add(fontSize);
    setInitialSetup((prev) => ({ ...prev, ['font_size']: fontSize }));
  };

  return (
    <div className="text-md font-normal  whitespace-nowrap w-[260px] duration-200 md:w-[300px]">
      <div className="flex items-center justify-between ">
        <div className="text-header-popup-heading-font-size font-header-popup-heading-font-weight text-color-header-popup-heading-default-text-color hover:text-color-header-popup-heading-hover-text-color">
          Theme Customizer
        </div>
        <div className="text-3xl" onClick={props.closeModel}>
          <i className="icon-close"></i>
        </div>
      </div>

      <div className="pt-3 flex flex-col ">
        <div>
          <div className="text-xl font-bold ">Custom navigation</div>
          <div className="flex py-4 gap-5">
            <div className="flex items-center">
              <label className=" gap-2 flex items-center">
                <input
                  type="radio"
                  name="navigation"
                  className=" checked:bg-blue-700"
                />
                <span className="">Top Navigation</span>
              </label>
            </div>
            <div className="flex items-center">
              <label className=" gap-2 flex items-center">
                <input
                  type="radio"
                  name="navigation"
                  className=" checked:bg-blue-700"
                  checked
                />
                <span className="">Left Navigation</span>
              </label>
            </div>
          </div>
        </div>

        <div>
          <div className="text-xl font-bold ">Custom Theme</div>
          <div className="flex py-4 gap-5">
            <div className="flex items-center">
              <label className=" gap-2 flex items-center">
                <input
                  type="radio"
                  id="light"
                  name="theme"
                  className=" checked:bg-blue-700"
                  onChange={(e) => {
                    toggleTheme(e.target.id);
                  }}
                />
                <span className="">Light</span>
              </label>
            </div>
            <div className="flex items-center">
              <label className=" gap-2 flex items-center">
                <input
                  type="radio"
                  id="dark"
                  name="theme"
                  className=" checked:bg-blue-700"
                  onChange={(e) => {
                    toggleTheme(e.target.id);
                  }}
                />
                <span className="">Dark</span>
              </label>
            </div>
            <div className="flex items-center"></div>
          </div>
        </div>

        <div>
          <div className="text-xl font-bold ">Primary colors</div>
          <div className="flex py-2 gap-5">
            <div className="flex items-center">
              <label className=" gap-2 flex items-center">
                <input
                  type="radio"
                  id="first-primary-color"
                  name="primary-colors"
                  className=" checked:bg-blue-700"
                  onChange={(e) => {
                    togglePrimary(
                      e.target.id,
                      initialSetup.theme === 'dark'
                        ? 'dark-theme-with-first-primary'
                        : 'light-theme-with-first-primary'
                    );
                  }}
                />
                <span className="">Pri 1</span>
              </label>
            </div>
            <div className="flex items-center">
              <label className=" gap-2 flex items-center">
                <input
                  type="radio"
                  id="second-primary-color"
                  name="primary-colors"
                  className=" checked:bg-blue-700"
                  onChange={(e) => {
                    togglePrimary(
                      e.target.id,
                      initialSetup.theme === 'dark'
                        ? 'dark-theme-with-second-primary'
                        : 'light-theme-with-second-primary'
                    );
                  }}
                />
                <span className="">Pri 2</span>
              </label>
            </div>
            <div className="flex items-center">
              <label className=" gap-2 flex items-center">
                <input
                  type="radio"
                  id="third-primary-color"
                  name="primary-colors"
                  className=" checked:bg-blue-700"
                  onChange={(e) => {
                    togglePrimary(
                      e.target.id,
                      initialSetup.theme === 'dark'
                        ? 'dark-theme-with-third-primary'
                        : 'light-theme-with-third-primary'
                    );
                  }}
                />
                <span className="">Pri 3</span>
              </label>
            </div>
          </div>
          <div className="flex py-2 gap-5">
            <div className="flex items-center">
              <label className=" gap-2 flex items-center">
                <input
                  type="radio"
                  name="primary-colors"
                  id="fourth-primary-color"
                  className=" checked:bg-blue-700"
                  onChange={(e) => {
                    togglePrimary(
                      e.target.id,
                      initialSetup.theme === 'dark'
                        ? 'dark-theme-with-fourth-primary'
                        : 'light-theme-with-fourth-primary'
                    );
                  }}
                />
                <span className="">Pri 4</span>
              </label>
            </div>
            <div className="flex items-center">
              <label className=" gap-2 flex items-center">
                <input
                  type="radio"
                  name="primary-colors"
                  id="fifth-primary-color"
                  className=" checked:bg-blue-700"
                  onChange={(e) => {
                    togglePrimary(
                      e.target.id,
                      initialSetup.theme === 'dark'
                        ? 'dark-theme-with-fifth-primary'
                        : 'light-theme-with-fifth-primary'
                    );
                  }}
                />
                <span className="">Pri 5</span>
              </label>
            </div>
            <div className="flex items-center">
              <label className=" gap-2 flex items-center">
                <input
                  type="radio"
                  id="sixth-primary-color"
                  name="primary-colors"
                  className=" checked:bg-blue-700"
                  onChange={(e) => {
                    togglePrimary(
                      e.target.id,
                      initialSetup.theme === 'dark'
                        ? 'dark-theme-with-sixth-primary'
                        : 'light-theme-with-sixth-primary'
                    );
                  }}
                />
                <span className="">Pri 6</span>
              </label>
            </div>
          </div>
        </div>

        <div>
          <div className="text-xl font-bold ">Custom Font size</div>
          <div className="flex py-4  gap-5">
            <div className="flex items-center">
              <label className=" gap-2 flex items-center">
                <input
                  type="radio"
                  name="font-size"
                  id="font-size-small"
                  className=" checked:bg-blue-700"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    toggleFontSize(e.target.id);
                  }}
                />
                <span className="">Small</span>
              </label>
            </div>
            <div className="flex items-center">
              <label className=" gap-2 flex items-center">
                <input
                  type="radio"
                  name="font-size"
                  id="font-size-medium"
                  className=" checked:bg-blue-700"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    toggleFontSize(e.target.id);
                  }}
                />
                <span className="">Medium</span>
              </label>
            </div>
            <div className="flex items-center">
              <label className=" gap-2 flex items-center">
                <input
                  type="radio"
                  name="font-size"
                  id="font-size-high"
                  className=" checked:bg-blue-700"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    toggleFontSize(e.target.id);
                  }}
                />
                <span className="">High</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreferenceModel;
